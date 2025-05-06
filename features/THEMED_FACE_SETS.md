# Summary

Introduce themed ASCII face sets covering animal and emoji expressions. Users can select or merge these themes into the face generator, enabling richer and more engaging output beyond the built-in lenny faces.

# Specification

- New flag `--theme <themeName>` to select a built-in theme. Valid theme names are:
  • `animals` (e.g., (=^.^=), (•ᴥ•), ʕ•ᴥ•ʔ, (◕ᴥ◕))
  • `emoji` (e.g., 😊, 😂, 😍, 🤖)
- New flag `--merge-theme` when used with `--theme` appends the themed faces to the standard built-in faces instead of replacing them.
- New flag `--list-themes` prints each available theme name on its own line and exits. Ignores other flags.
- When `--theme` is provided without `--merge-theme`, the themed faces replace the built-in face set; other flags (`--faces-file`, `--merge-faces`) are ignored in that mode.
- The theme face set is used by all modes (`--face`, `--list-faces`, `--list-categories`). Category filtering is disabled for themes; only theme faces are listed or sampled.
- Error handling:
  • Unknown theme names produce a descriptive error listing valid themes and exit with nonzero status.
  • Using `--merge-theme` without `--theme` produces an error.

# Testing

- In `tests/unit/main.test.js` or a new `tests/unit/theme.test.js`, verify:
  • `main(["--list-themes"])` prints `animals` and `emoji` lines and exits without error.
  • `main(["--face","--theme","animals"])` outputs one of the animal faces.
  • `main(["--face","3","--seed","42","--theme","emoji"])` outputs three emoji characters, reproducible by seed.
  • `main(["--face","--theme","animals","--merge-theme"])` includes both lenny faces and animal faces.
  • Invalid theme name `--theme unknown` throws an error listing valid themes.
  • Using `--merge-theme` without `--theme` throws an error.

# Documentation

- Update `README.md` under Features to include:
  ```
  --theme <themeName>       select a built-in themed face set (animals, emoji)
  --merge-theme             append theme faces to built-in faces
  --list-themes             list available themes and exit
  ```
- Add `docs/THEMED_FACE_SETS.md` describing themes, face examples, and flag behavior.
- Include usage examples:
  ```
  node src/lib/main.js --face --theme animals
  node src/lib/main.js --list-faces --theme emoji --merge-theme
  node src/lib/main.js --list-themes
  ```

# Implementation Details

- In `src/lib/main.js`, define a new constant `builtInThemes`:
  ```js
  const builtInThemes = {
    animals: ['(=^.^=)','(•ᴥ•)','ʕ•ᴥ•ʔ','(◕ᴥ◕)'],
    emoji: ['😊','😂','😍','🤖']
  };
  ```
- Extend argument parsing in `main` to detect `--list-themes`, `--theme`, and `--merge-theme` before other flags.
- If `--list-themes`, print theme names and exit.
- If `--theme` is set, validate theme name against `builtInThemes` keys. If invalid, call `errorExit`.
- When generating or listing faces:
  • If `theme` is set:
    – Build face array from `builtInThemes[theme]`.
    – If `mergeTheme` is true, load `builtInFaces` and append theme faces.
    – Ignore `loadFaceSet` and related custom file logic.
  • Delegate to existing `generateFaces`, `listFaces`, or inline sampling by combining the theme face array with the seeded RNG and `shuffleArray`.
- Ensure tests, interactive mode, and HTTP API also honor theme flags where appropriate.

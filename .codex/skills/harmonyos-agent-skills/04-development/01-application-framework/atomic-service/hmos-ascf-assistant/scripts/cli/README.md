# ASCF CLI - Icon Generator

A Node.js CLI tool for generating atomic service icons from source images.

## Installation

```bash
pnpm install
```

## Usage

### Generate App Icons

Generate a 512x512 app icon and optionally a 216x216 AGC icon:

```bash
node cli.js generate-as-icon -i image-1024x1024.png -o app_icon.png --agc app_icon_agc.png
```

### Options

- `-i, --input <path>` (required) - Input image path (1024x1024 recommended)
- `-o, --output <path>` (required) - Output 512x512 app icon path
- `--agc <path>` (optional) - Output 216x216 AGC icon path for AppGallery Connect
- `--force` - Overwrite existing output files (default: false)

### Examples

**Generate only app icon:**
```bash
node cli.js generate-as-icon -i source.png -o app_icon.png
```

**Generate both icons:**
```bash
node cli.js generate-as-icon -i source.png -o app_icon.png --agc app_icon_agc.png
```

**Overwrite existing files:**
```bash
node cli.js generate-as-icon -i source.png -o app_icon.png --force
```

**View help:**
```bash
node cli.js --help
node cli.js generate-as-icon --help
```

## Output

- **512x512 icon** - Standard app icon with circular crop
- **216x216 icon** - AGC (AppGallery Connect) icon with circular crop

Both icons are PNG format with circular crop applied.

## Architecture

### Files

- **cli.js** - CLI entry point using Commander.js, handles command parsing and execution
- **asicon-node.js** - Icon generation logic using sharp for image processing
- **package.json** - Project dependencies and configuration

### Dependencies

- **sharp** (^0.34.5) - Image processing and manipulation
- **commander** (^14.0.3) - CLI framework and argument parsing

## Extensibility

The CLI is designed for easy extension with additional commands:

1. Add new command in `cli.js` using `program.command()`
2. Create corresponding implementation module
3. Export the handler function

Example:
```javascript
program
  .command('new-command')
  .description('Description')
  .option('-f, --flag <value>', 'Option')
  .action(async (options) => {
    // Implementation
  });
```

## Error Handling

The CLI provides clear error messages for:

- Missing input file
- Existing output files (with --force override)
- Invalid image formats
- File system errors

## Notes

- Input images should ideally be 1024x1024 for best quality
- Output images are automatically circular cropped
- PNG format is used for all outputs (supports transparency)

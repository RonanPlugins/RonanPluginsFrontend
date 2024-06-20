// Used to install TinyMCE (Text Editor) so we dont need an API key (this self hosts the packages)
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the top directory
const topDir = __dirname;

// Empty the target directory
fs.emptyDirSync(path.join(topDir, "public", "tinymce"));

// Copy the contents from source to target
fs.copySync(
  path.join(topDir, "node_modules", "tinymce"),
  path.join(topDir, "public", "tinymce"),
  { overwrite: true }
);

// Used to install TinyMCE (Text Editor) so we dont need an API key (this self hosts the packages)
import fse from "fs-extra";
import path from "path";
const topDir = import.meta.dirname;
fse.emptyDirSync(path.join(topDir, "public", "tinymce"));
fse.copySync(
  path.join(topDir, "node_modules", "tinymce"),
  path.join(topDir, "public", "tinymce"),
  { overwrite: true }
);

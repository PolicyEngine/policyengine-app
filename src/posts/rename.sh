#!/bin/bash
YYYY_MM_DD="[0-9]{4}-[0-9]{2}-[0-9]{2}-"
echo "Renaming all markdown files beginning with YYYY-MM-DD format..."
for FILE in *.md
do
  if [[ $FILE =~ ^${YYYY_MM_DD}.*$ ]]; then
      NEW_FILE=${FILE:11}
      echo "$FILE is renamed to $NEW_FILE"
      # use "git mv" so that all renaming are correctly shown as "renamed" on Git
      git mv "$FILE" "$NEW_FILE"
  fi
done
echo "Renaming all markdown filenames beginning with YYYY-MM-DD format in posts.json..."
sed -i "" -E "s/(\"filename\"[[:space:]]*:[[:space:]]*\")${YYYY_MM_DD}(.*)/\1\2/g" posts.json
echo "Renaming done!"

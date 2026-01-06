#!/usr/bin/env bash

SRC="icon.png"

if [ ! -f "$SRC" ]; then
  echo "Source file '$SRC' not found!"
  exit 1
fi

sizes=(16 32 48 96)

for s in "${sizes[@]}"; do
  echo "Creating icon-$s.png ..."
  magick "$SRC" -resize "${s}x${s}" "icon-$s.png"
done

echo "Done! Icons generated:"
ls icon-*.png

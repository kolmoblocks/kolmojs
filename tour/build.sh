for file in *.md
do
  showdown makehtml -i "$file" > htmled/"$file".html
done
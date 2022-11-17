all:

render_ani:
	blender scene.blend --background --python scripts/run.py

encode_video:
	cd video/png
	ffmpeg -framerate 24 -f image2 -pattern_type glob -i '*.png' -c:v libx264 -r 24 -pix_fmt yuv420p animation.mp4
	mv animation.mp4 ../

clean_images:
	rm -rf video/png/*.png

clean_videos:
	rm -rf video/*.mp4

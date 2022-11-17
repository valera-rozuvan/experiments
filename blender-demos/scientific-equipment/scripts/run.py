import bpy
import os

# format integer with leading zeros
def formatNumbers(number, length):
    return '%0*d' % (length, number)

# get the scene
scn = bpy.context.scene

# get the output path
output_path = scn.render.filepath

# set filename
filename = ""

# set render frames
render_frames = range(1, 2)

# iterate through render frames
for f in render_frames:

    # set the frames
    scn.frame_set(f)

    # set filepath
    scn.render.filepath = os.path.join(
        output_path,
        filename + formatNumbers(f, 4) + ".png",
    )

    # render
    bpy.ops.render.render(use_viewport=True, write_still=True)

# reset internal filepath
bpy.context.scene.render.filepath = output_path

# Mystic Match
Welcome to the testing README document for Mystic Match.

## Testing
    - TODO 
## Debugging

### known bugs 
    - Cards would only partially flip and have a delay showing the image.

### resolved bugs
    - Cards now flip as expected, this bug was due to a couple of lines of code that was in my css styles document. one had a transform animation of 1 second ease. the other conflicting animation was a hover animation. By removing the transform and the hover animation it is flipping cards immediately. 
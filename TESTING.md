# Mystic Match
Welcome to the testing README document for Mystic Match.

## Testing
 validator testing is as follows: 

 initially, I had sections in my code to clearly mark different areas. After running through W3Schools HTML validator, warnings came up about the sections with missing headings, therefore on removing these sections and replacing them with the div elements, All tests passed. 

 INSERT SS HERE

 my css document didn't have any errors or warnings to show.

 INSERT SS HERE 

 JSlint

 my JavaScript file returned these metrics:

 INSERT SS HERE

 on looking at them, I wondered what all of them meant, I opened Replit and used Replit AI to help better understand the metrics from JSLint.

 on reflection, these are my interpretations from the metrics. 

 - Total Number of 28 functions
 - function signatures:
    - Largest Function Signature: 1 argument
    - Median Function signaturte: 0 arguments
 - Function Length: 
    - Largest Function: 8 statements
    - Median Function length: 3 statements
 - Cyclomatic Complexity:
    - Most Complex Function: Cyclomatic complexity of 5
    - Median Cyclomatic complexity: 1

 Total Functions - there are 28 functions all together written in this file, due to the volume of functions, this means that each function is modularized which in turn allows for better organization and maintainability. 

 Function Signatures - the largest signature takes one argument, while most functions take no arguments. 
 due to low signature rates, this indicates that functions are likely to be self-contained, enhansing reusability and reducing dependencies.

 Function Length - the largest function is 8 statements, while the median function length is 3. this suggests that functions are concise and likely adhere to the single responsibility principle, making the code easier to read and maintain. 

 Cyclomatic Complexity - the most complex function has a cyclomatic complexity of 5, indicating a low level of complexity. the median complexity is 1 indicating that most functions are straightforward with a single execution path. the low complexity values also mean that the code is likely to be easy to understand, read, maintain and test with a reduced risk of complexity related bugs. 

 good code practices have been followed where possible in creating this project.  
## Debugging
### existing bugs 
     - the timer doesn't reset following 'game over' overlay. More time would be needed too debug and iron out this particular bug fully. 
     When trying to debug it during finalizing, this would quite often pose an error that would prevent other things from working corectly. hense why this bug still exists but the game works as expected despite the timer not always reducing.
     
     - the winner overlay flips cards back and resets the match counter but doesn't re-shuffle the cards. whilst this is still a known bug, on web page refresh cards will re-shuffle. 
     again and present as a fresh deck. More time would be needed to debug this fully.    
    
### known bugs 
     - Cards would only partially flip and have a delay showing the image.

### resolved bugs
     - Cards now flip as expected, this bug was due to a couple of lines of code that was in my css styles document. one had a transform animation of 1 second ease. the other conflicting animation was a hover animation. By removing the transform and the hover animation it is flipping cards immediately. 

## further testing

further testing was completed across multiple devices on multiple browsers and no further issues where found. 
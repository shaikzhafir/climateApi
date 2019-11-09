# climateApi
Climate api call using esp8266 huzzah

Optional ( if you require more ports/pins, please obtain a shift register/PCA9865(pwm pin port expander) )

What was used: 
a few breadboards
many jumper cables (male-female + male-male)
50 x rgb led (in excess)
resistors to maintain longevity of LEDS
esp8266 huzzah feather 
pca8965 pwm port expander
MC74H595 Shift Register (from lab)
visual code editor 

basically using nodejs with fetch and johnny five libraries to connect huzzah wifi module to an air quality api to reflect brightness of LED depending on the air quality level

# setup
For nodejs setup with the esp8266, please refer to https://boneskull.com/how-to-use-an-esp8266-with-johnny-five/ for a very detailed setup guide, its basically for dummies(me)

node-fetch was used to retreive api data from aqicn.org 
johnny five board expander api was used for shift register code
johhny five pca9865 library was used for the PCA9865 expander code

blink.js is the file for using shift register
pcatest.js is the file for using, well, the PCA



const StyleDimensions = {
    PackScreen:{
        // Question Mark
        questionSize:35,
        questionMargin:25,// Space around the question mark

        // Setting Button
        settingSize:35,
        settingMargin:25,
        settingLeft:325,

        // Logo **** KEEP RATIO THE SAME FOR WIDTH AND HEIGHT****
        logoWidth:1718/8, // Higher the number shorter the size
        logoHeight: 642/8,
        logoLeft:75,  // higher the number moves <-- that way
        logoMoveUp:55, // higher the number moves down
        // Card Size
        cardSize:200,// size of card best to use between 0-1
        cardHieght:220,
        SPACING:5, // how think the black part around the pack image is 
        // Card Text
        cardTitleFontSize:20,
        pushUp:100,
        cardTitleMoveDown:10,
        cardDescriptionFontSize:13,
        cardDescriptionPadding:5, // the space all around it

        // Button 
        buttonPushUp:25,
        buttonFlex:.7, // Tells how much of the screen goes to the button
        OutsideHeight:90, // The height of button
        OutsideWidth:280, // Outside white width of button
        OutsideBorderRadius:30, // How curvy is outside white part
        InsideWidth:270, // Inside black part width
        InsideBorderRadius:30, // How curvy is black inside part
        marginVertical: 5, // Squishes black part verticaly 
        cdcFontSize:20,
        nightFontSize:20,
        dayFontSize:20,
    }
}

export default StyleDimensions;

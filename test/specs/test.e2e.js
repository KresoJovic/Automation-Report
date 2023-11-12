// Zad1. Pretrazivanje elemenata po Access. ID-u

describe('Trazenje elementa Accessibility ID', () => {

    it('Find element', async () => {
        
        //lociranje "App" komponente u aplikaciji
        const appOption = await $('~App');

        //klik na "App"
        await appOption.click();

        //lociranje "App/ActionBar"
        const actionBar = await $('~Action Bar');

        //provjera vidljivosti Action Bara
        await expect(actionBar).toBeExisting();
   });




// Zad2. Pretrazivanje elemenata po Class Name-u

    xit('Find element by class', async () => {

        const className = await $('android.widget.TextView');

        //s obzirom da svi elementi imaju isti Class Name ispisat ćemo prvi u nizu

        console.log(await className.getText());
 
    });



// Zad3. Pretrazivanje 2 elementa po Access ID-u. "Provjera" pretrage i ispis.


xit('Find element by Accessibility ID', async () => {

        const appButton = await $('~App');
        console.log(await appButton.getText());

        const pref = await $('~Preference')
        console.log(await pref.getText());

        await appButton.click();
        const alarm = await $('~Alarm')
        console.log(await alarm.getText());


});


// Zad4. Pretrazivanje elementa po XPathu class name (tag name) + cont description


    xit('Find element by XPath', async () => {

      // Xpath = (//tagname(class name)[@attribute="value"])
      await $('//android.widget.TextView[@content-desc="Alert Dialogs"]').click();
      
      // XPath = (//tagname(resource-id)[@attribute="value"])
      await $('//android.widget.Button[@resource-id="io.appium.android.apis:id/select_button"]').click();


    });


// Zad5. Pretrazivanje elemenata po UiAutomatoru

//xit('Find element by UiAutomator', async () = > {
    
    // by text contains
  //  await $('android=new UiSelector().textContains("Alert")').click();

//});



// Zad6. Pretrazivanje nekoliko elemenata

// $ - single element , $$ - multiple elements



it('Find multiple elements', async () => {
    
    const expectedList = [
        'API Demos', "Accessib'lity", 'Accessibility', 
        'Animation', 'App', 'Content',
        'Graphics', 'Media', 'NFC', 
        'OS', 'Preference', 'Text', 'Views'

    ]

    const actualList = []


    // find multiple elements

    const textList = await $$('android.widget.TextView');

    // loop through them while adding new entry to actual list
    
    for (const element of textList) {
        actualList.push(await element.getText());
    }


    // validating the results

    await expect(actualList).toEqual(expectedList);

    
});


// Zad 7. Text field unos

it.only('Working with text field', async () => {

// acess the auto complete screen
await $('~Views').click();
await $('//[@text="Auto Complete"]').click();
await $('//*[@content.desc="1. Screen Top"]').click();

// enter text
const textField = await $('//*[@resoource-id="io.appium.android.apis:id/edit"]');
await textField.addValue('Imotski');

// verify the text
await expect(textField).toHaveText('Imotski');

});


});


// Zad8. Direktan pristup ekranima (PACKAGE & ACTIVITY)

describe('Trazenje elementa Accessibility ID', () => {

    it('Acces and Activity directly', async () => {

        // access activity (Actions -> Device/Android Activity) "CURRENT PACKAGE, CURRENT PACKAGE.ACTIVITY"
        await driver.startActivity("io.appium.android.apis", "io.appium.android.apis.app.AlertDialogSamples");

        // pause 3 s
        await driver.pause(3000);

        // assertion
        await expect($('//*[@text="App/Alert Dialogs"]')).toExist();

    })


    // Zad9. DIALOG BOX

    it('Working with Dialog Boxes', async () => {

        //access activity 
        await driver.StartActivity("io.appium.android.apis", "io.appium.android.apis.app.AlertDialogSamples");

        // click on dialog box
        await $('//*[@resoource-id="io.appium.android.apis:id/two_buttons")').click();

        // accept Alert
        await driver.acceptAlert();

        //dismiss Alert
        await driver.dismissAlert();

        //get alert text
        console.log('ALERT TEXT -->', await driver.getAlertText());

        // ckucj on the OK button
        await $('//*[@resource-id="android:id/button1"]').click();

        // assertion - alert box is no longer visible
        await expect($($('//*[@resource-id="android:id/alertTitle")'))).not.ToExist();


});



// Zad10. Vertikalno skrolanje

it('Vertical scrolling', async () => {

    await $('~App').click();
    await $('~Activity').click();

    // scrollTextIntoView - stabilnija varijanta
    await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView(1,5)');


    // await $('~Secure Surfaces').click();

    //assertion
    await expect($('~Secure Dialog')).toExist();

});


// Zad11. Horizontalno skrolanje

it('Horizontal scrolling', async () => {
await driver.startActivity(
    "io.appium.android.apis",
    "io.appium.android.apis.view.Gallery1"
);

// Horizontal scrolling
await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollToForward()');
await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollToBackward()');

await driver.pause(3000);
});


// Zad12. Vjezba skrolanje

it('Working with a date picker', async () => {

    // access the date picker
    await driver.startActivity(
        "io.appium.android.apis",
        "io.appium.android.apis.view.DateWidgets1"
    )

    // get current date
    const date = await $('//*[@resource-id="io.appium.android.apis:id/dateDisplay"]');
    const currentDate = await date.getText();

    // click on change the date button
    await $('~change the date').click();

    // scroll right to the next month
    await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');

    // select the 10th date
    await $('//*[@text="10"]').click();

    // click on ok button
    await $('//*[@resource-id="android:id/button1"]').click();

    // verify the updated date
    await expect(await date.getText()).not.toEqual(currentDate);

    });
});
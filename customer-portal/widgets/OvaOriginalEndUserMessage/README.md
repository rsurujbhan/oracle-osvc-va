# OvaOriginalEndUserMessage Widget

## Installation Overview

1. Upload the OvaOriginalEndUserMessage widget directory into /dav/cp/customer/development/widgets/custom/\<dir\> where "dir" is a directory of your choosing inside the /custom directory.
   * full path example once uploaded: /dav/cp/customer/development/widgets/custom/chat/OvaOriginalEndUserMessage/1.0/
3. Activate the widget in Customer Portal Administration at https://<your_site>/ci/admin
    * use the 'Activate this version' button on the widget's detail page
4. Insert the widget reference and optional code snippets INTO the chat_landing page
5. Publish changes to CP Staging and CP Production modes

## Alternate Widget Installation and Setup Process
Instead of just directly copying files into a /development/widgets/custom subdirectory, you can also use the Widget Builder GUI in CP Administration to create the widget first (Widgets > Create a New Widget > "Create a brand new widget from scratch"). This will set up the widget's file directory and its files.

If using this method, set the "Does this widget have JavaScript?" option to YES in Step-3/Components. All other options can be left at their defaults (Has-a-Controller=No, Has-a-View=No, etc.)

Once the widget builder wizard has completed, the widget will be automatically activated. Access the widget's directory via WebDAV and update/replace the base.css, info.yml, and logic.js files accordingly.

## How It Works
This custom widget assumes the general design of the reference chat_launch page is being used and the *standard* Incident Subject object field is being passed (POST-ed) to the chat_landing page. 

Using PHP, the Incident Subject string value from the chat_launch page gets inserted into the "eu_message_text" attribute of the custom widget on the chat_landing page.  

The widget subscribes to the **evt_chatEngagementParticipantAddedResponse** JavaScript event which is fired by the standard chat controller when any end-user, agent, or the VA enters a chat session.  Once the event is fired, and VA is detected as the Lead of the chat session, an automatic "End User Post" message payload, *containing the Incident Subject*, will be generated and inserted into the chat transcript.  This simulates the end-user asking their question to the VA.

## Inserting the OvaOriginalEndUserMessage widget
There are multiple ways to install the widget into the chat_landing page. 

The recommended location for the \<rn:widget\> tag is *early* in the DOM of the page - after the \<body\> and in the main chat UI container, but before any of the main chat widgets load. 

Example: if using the reference chat_landing page code, a good place would be before the "ChatOffTheRecordDialog" widget.


## Method #1 - Insert the OvaOriginalEndUserMessage widget
Insert the following code snippet into the chat_landing page.

Details:
- The Incident Subject value gets passed into the widget directly from the $_POST associative array of variables passed to chat_landing page.

~~~~
...
<div class="rn_Padding">
    <!-- START OvaOriginalEndUserMessage -->
    <rn:widget path="custom/chat/OvaOriginalEndUserMessage" eu_message_text="#rn:php:$_POST['Incident_Subject']#" />
    <!-- END OvaOriginalEndUserMessage -->
    <rn:widget path="chat/ChatOffTheRecordDialog"/>
        <div id="rn_ChatDialogContainer"> 
...
~~~~

## Method #2 Part 1 of 2 - Add PHP code to capture the user question from the chat_launch form
This is an alternative to Method #1. Do not use both!

Insert the following code snippet into the chat_landing page. 

Details:
- This method is useful if you need to add logic and/or check/modify/override the value of the Incident Subject string *before* it gets passed into the widget.

- The PHP variable $incSubject is set at the very top of the chat_landing page which receives the value from the $_POST associative array of variables passed to chat_landing page.

~~~~
<!DOCTYPE html>
<html lang="#rn:language_code#">
<rn:meta clickstream="chat_landing" javascript_module="standard" include_chat="true"/>
<?
    /*
    value to be passed into the OvaOriginalEndUserMessage widget
    */
    $incSubject = $_POST["Incident_Subject"];

    //add any additional logic here...    
?>
<head>
    <meta charset="UTF-8">
...
~~~~

## Method #2 Part 2 of 2 - Insert the OvaOriginalEndUserMessage widget
This is an alternative to Method #1. Do not use both!

Insert the following code snippet into the chat_landing page. 

Details:
- The $incSubject variable (defined in the PHP code block earlier in the page) will be used as input to the widget's logic.

~~~~
...
<div class="rn_Padding">
    <!-- START OvaOriginalEndUserMessage -->
    <rn:widget path="custom/chat/OvaOriginalEndUserMessage" eu_message_text="#rn:php:$incSubject#" />
    <!-- END OvaOriginalEndUserMessage -->
    <rn:widget path="chat/ChatOffTheRecordDialog"/>
        <div id="rn_ChatDialogContainer">
    
...
~~~~

## Stage and Promote/Publish the Customer Portal Changes
Use the standard CP publishing process to Stage (then test!) and Promote the widget and changes to the chat_landing page.
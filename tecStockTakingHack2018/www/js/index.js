/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


            


var app = {

    id : "perra yiann",
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        console.log("Starting NFC Reader app");
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function(){

            //Listen to Tag RFID
            nfc.addTagDiscoveredListener(
                app.onNonNdef,  //Tag successfully scanned
                function(status){
                    
                },
                function(error){
                    app.display("NFC reader failed to initialize " + JSON.stringify(error));
                }
            );
            
            //Listen to NDEF tags
            nfc.addNdefListener(
                app.onNfc,
                // Tag successfully scanned
                function (status) {
                // Listener successfully initialized
                },
                function (error) {
                // Listener fails to initialize
                app.display("NFC reader failed to initialize " + JSON.stringify(error));
                }
            );
    },

    /*
    Process NDEF tag data from the nfcEvent
    */
    onNfc: function(nfcEvent) {
        app.clear('messageDiv');
        app.display("Event Type: " + nfcEvent.type,'messageDiv');
        //app.showTag(nfcEvent.tag);
        // display the tag details
    },
    /*
    Process non-NDEF tag data from the nfcEvent
    This includes
    * Non NDEF NFC Tags
    * NDEF-Formatable Tags
    * Mifare Classic Tags on Nexus 4, Samsung S4
    (because Broadcom doesn't support Mifare Classic)
    */

    onNonNdef: function(nfcEvent) {
        app.clear('messageDiv');
        var tag = nfcEvent.tag;
        app.id = nfc.bytesToHexString(tag.id); 
        window.location.href = 'userInfo.html' + '#' + app.id;
      
    },

    /*
    iterates over the records in an NDEF message to display them:
    */
    showMessage: function(message) {
        for (var thisRecord in message) {
        // get the next record in the message array:
        var record = message[thisRecord];
        app.showRecord(record);
        // show it
        }
    },
    /*
    writes @record to the message div:
    */
    showRecord: function(record) {
    // display the TNF, Type, and ID:
        app.display(" ");
        app.display("TNF: " + record.tnf);
        app.display("Type: " + nfc.bytesToString(record.type));
        app.display("ID: " + nfc.bytesToString(record.id));
        // if the payload is a Smart Poster, it's an NDEF message.
        // read it and display it (recursion is your friend here):
        if (nfc.bytesToString(record.type) === "Sp") {
            var ndefMessage = ndef.decodeMessage(record.payload);
            app.showMessage(ndefMessage);
        // if the payload's not a Smart Poster, display it:
        } else {
        app.display("Payload: " + nfc.bytesToString(record.payload));
        }
    },


    display: function(message, div){
        
        var label = document.createTextNode(message),
        linebreak = document.createElement("br");
        elem = document.getElementById(div);
        elem.appendChild(linebreak);
        elem.appendChild(label);
     

    },

    clear: function(div){
        elem = document.getElementById(div);
        elem.innerHTML = "";
    },

    userInfo: function(message){
        app.clear('userInfDiv');
        app.id =  message;
        app.display(message, 'userInfDiv');
    },

    goToRegresar: function(){
        
        window.location.href = 'regresar.html' + '#' + app.id;
        
    },

    goTosSacar: function(){
        window.location.href = 'sacar.html' + '#' + app.id;
    },
    
    regresar: function(id){
        app.id = id;
        app.display("regresale conpadre " + app.id, 'regresar');
    },
    sacar: function(id){
        app.id = id;
        app.display("sacale conpadre " + app.id, 'sacar');
    }

};


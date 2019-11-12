'use strict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const schemaStatus = new Schema({
    Light: {
               Light_Name: {
                   type: String,
                   required: true
               },
               Status: {
                   type: String,
                   default: 'off'
               },
            },
    Door: {
                Door_Name: {
                    type: String,
                    required: true
                },
                Status: {
                    type: String,
                    default: 'closed'
                },
            },
    Window: {
                Window_Name: {
                    type: String,
                    required: true
                },
                Status: {
                    type: String,
                    default: 'closed'
                }

            }
});

modules.export = mongoose.model('Status', schemaStatus, "Status");
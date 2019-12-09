import React, { Component } from "react";
import { 
    AppRegistry, 
    StyleSheet, 
    View, 
    Button, 
    Text,
    ImageBackground,
    ScrollView, 
    Dimensions 
        } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import FoundationIcon from "react-native-vector-icons/Foundation";
import PlusIcon from "react-native-vector-icons/AntDesign";
import {fetchLights} from "./api";

import alertHandler from './alerthandler';

let entireScreenWidth = Dimensions.get('window').width;

EStyleSheet.build({$rem: entireScreenWidth / 360});


const INITIAL_VALUE = 0;
export default class Lights extends Component {
    state = {
        lights: [
           {
                Name:"Hallway",
                Status:"off"
           },
           {
                Name:"Living room",
                Status:"disconnect"
            },
            {
                 Name:"Bed room",
                 Status:"off"
            },
            {
                Name:"Bed room 2",
                Status:"on"
            },
            {
                Name:"Children's room",
                Status:"disconnect"
            },
            {
                Name:"Bat signal",
                Status:"on"
            },
            {
                Name:"Bat signal (extra)",
                Status:"disconnect"
            },
            {
                Name:"Disco ball",
                Status:"on"
            },
            {
                Name:"Storage room",
                Status:"disconnect"
            },
        ]
    };
    fetchData = async () => {
        try {
          const data = await fetchLights();
          console.log("promise?", data);
    
          this.setState({
            lights: data.Lights
          });
        } catch (err) {
          () => {
            console.log(err)
          }
        }
      }

    // componentDidMount() {

    //     this.fetchData()
    //     alertHandler()
    //   }
    render() {
        console.log("lights rendering");

        let activeLights = this.state.lights.filter(light => {
              return ((light.Status === "off") || (light.Status === "on"))
            });

        let disconnectedLights = this.state.lights.filter(light => light.Status === "disconnect");

        let renderLights = activeLights.map((light, index) => {

                                return <View key={index+"a"} style={styles.item}>
                                        <View
                                            style={[styles.lightBulb, {backgroundColor: light.Status === "on" ? "rgb(0,122,255)":"rgba(255,255,255,0.5)"}]}>

                                            <FoundationIcon
                                                style={{fontSize: 40}} 
                                                onPress={() => console.log(light.Name)}
                                                name="lightbulb"
                                                color="rgb(255,255,255)"
                                            />
                                        </View>
                                        <Text style={[styles.lightText, ]}>{light.Name}</Text>
                                    </View>;
                                }
                            )

        let renderDisconnectedLights = disconnectedLights.map( (light, index) => {

                                    return <View key={index+"d"} style={styles.item}>
                                                <Text style={styles.disconnectedText}>Disconnected</Text>
                                                <View style={styles.lightBulb}>
                                                    <FoundationIcon
                                                        style={{ fontSize: 40 }}
                                                        name="lightbulb"
                                                        color={"rgb(0,0,0)"}
                                                        onPress={() => console.log(light.Name)}
                                                    />
                                                </View>
                                                <Text style={[styles.lightText, {color: "rgba(255,255,255,0.5)"}]}>{light.Name}</Text>
                                            </View>
                                        }
                                    )

        let noLight = <View style={styles.noLight}>
                            <Text style={styles.noLightText}>No lights registered</Text>
                        </View>

        let lightsContent;
    
        
        if ((!activeLights.length) && (!disconnectedLights.length)){
            console.log("No light"),
            lightsContent = noLight;
        } else if (!disconnectedLights.length){
            console.log("Lights rendered")
            lightsContent = renderLights;
        } else if (!activeLights.length){
            console.log("Disconnected lights rendered")
            lightsContent = renderDisconnectedLights;
        } else {
            console.log("Lights & disconnected lights rendered")
            lightsContent = [...renderLights, ...renderDisconnectedLights];
        }
        

        return (
            <ImageBackground source={require("../assets/raindrop.jpg")} style={styles.container}>
                <ScrollView style={styles.mainPart}>

                    <View style={styles.lightsBox}>
                        {lightsContent}
                    </View>
                        
                    <View style={styles.buttonWrapper}>
                        <View style={styles.plusButton}>
                            <PlusIcon
                                name="plus"
                                style={ {fontSize: 40} }
                                onPress={() => console.log("trying to add a light")}
                                color="rgb(255,255,255)"
                                />
                        </View>
                    </View>
                            
                    <View style={styles.buffer}></View>
                </ScrollView>


            </ImageBackground>
        );
    }
}
/* AppRegistry.registerComponent("Dashboard", () => Dashboard); */
const styles = EStyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    mainPart: {
        flex: 1,
        paddingTop: "40rem",
        paddingLeft: "20rem",
        paddingRight: "20rem",
    },
    noLight: {
        height: "150rem",
        marginBottom: "15rem",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        borderRadius: 10,

    },
    noLightText: {
        color: "rgb(255,255,255)",
        width: "100%",
        textAlign: "center",
        fontSize: "20rem",
    },
    lightsBox: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingTop: "10rem",
    },
    item: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        height: "150rem",
        width: "150rem",
        borderRadius: 10,
        // margin: "20rem",
        marginBottom: "20rem",
    },
    lightBulb: {
        height: "50%",
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
        borderRadius: 50,
    },
    lightText: {
        color: "rgb(255,255,255)", 
        textAlign: "center",
        position: "absolute",
        bottom: 10,
        paddingRight: "3rem",
        paddingLeft: "3rem",
    },
    disconnectedText: {
        position: "absolute",
        height: "20rem",
        width: "100%",
        textAlign: "center",
        top: "65rem",
        zIndex: 1,
        color: "rgba(255,255,255, 0.5)",
        backgroundColor: "rgba(255,255,255,0.1)"
    },
    buttonWrapper: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "25rem",
        paddingBottom: "60rem",

    },
    plusButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(91, 194, 54, 0.9)",
        height: "70rem",
        width: "70rem",
        paddingTop: "4rem",
        borderRadius: 50,
    },
    buffer: {
        height: 50
    }

});

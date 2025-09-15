import { StyleSheet } from "react-native"
import { fontSizes } from "./settings"
import { Surface } from "react-native-paper"

export const stylesSettings = StyleSheet.create({
    setting:{
        

     
    } ,
    surface: {
        margin: 'auto',
        borderRadius: 6,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 15,
        paddingTop: 10,
        height: 'auto',
        width: '80%',
        alignItems: 'center',        
        justifyContent: 'center',
    },
    divider:{
        marginTop:5,
        marginBottom:5,
        width: '100%'
    },
    rowbox:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-around',
    
        width: '100%',
   
    },
    columnbox:{
        flexDirection: 'column',
        alignItems:'center',
        justifyContent: 'center',
      
    },
     selected:{
        borderWidth: 2,
        borderColor: '#388E3C',
      
    }
})
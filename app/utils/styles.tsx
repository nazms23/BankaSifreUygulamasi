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
        marginTop: 20,
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
      
    },
    switchbox:{
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between',
        backgroundColor: '#69696969',
        borderRadius: 6, 
        marginTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
   
      
    },
      switch:{
        color: '#ffff',
   
      
    },
      tooltip:{
   
       backgroundColor: '#ffffff3f',
        width: 100,
        
    },
      button:{
        marginTop: 10,
        marginBottom: 5,
        flexDirection: 'row-reverse',
      
    }
})
export const stylesItems = StyleSheet.create({
  surface: {
    padding: 8,
    height: 80,
    width: '100%',
    borderRadius:12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    
  }, itemcont: {
    
    marginTop: 5,
     
    flexDirection: 'column',
  
   


 

  },
  surfaceText:{
    width: '70%',
    marginRight: 50,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    fontSize: 25,
  },
  imagecont:{
    backgroundColor: '#ffff',
    padding: 5,
    borderRadius: 6,
     width: '30%',
  }, image:{
    width: '100%',
    resizeMode: 'center',
    height: '100%',
    
    
    padding: 30,

  },badges:{
    position: 'absolute',
    alignSelf: 'flex-start',
    top: -5,
    right: -2,
    
    
    
  },
});
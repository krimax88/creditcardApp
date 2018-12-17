import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import React, { Component } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { Bars, } from 'react-native-loader';
const s = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    marginTop: 60,
  },
  label: {
    color: "black",
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: "black",
  },
});
const USE_LITE_CREDIT_CARD_INPUT = false;
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitting: false,
      paymentSuccess: false,
      requiresName:'',
      requiresCVC:'',
      requiresPostalCode:''
    };
  }

  _onChange = formData => {
    console.log(JSON.stringify(formData, null, " "));
  };

  _onFocus = field => {
    console.log(field);
  };

  submit = () => {
    const { requiresName, requiresCVC,requiresPostalCode } = this.state;
      if(requiresName == ""){alert("name is required"); return false;}
      if(requiresPostalCode == ""){alert("postal date is required"); return false;}
      if(requiresCVC == ""){alert("cvc is required"); return false;}
    this.setState({ submitting: true });
    setTimeout(() => {
      this.setState({ submitting: false, paymentSuccess: true })
    }, 3000);

  }

  render() {
    const {requiresName, requiresCVC,requiresPostalCode, submitting, paymentSuccess} = this.state;

    return (
      <View style={s.container}>
        {USE_LITE_CREDIT_CARD_INPUT ?
          (<LiteCreditCardInput
            autoFocus
            inputStyle={s.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            onFocus={this._onFocus}
            onChange={this._onChange} />) :
          (<CreditCardInput
            autoFocus
            requiresName
            requiresCVC
            requiresPostalCode
            labelStyle={s.label}
            inputStyle={s.input}
            validColor={"black"}
            invalidColor={"red"}
            placeholderColor={"darkgray"}
            onFocus={this._onFocus}
            onChange={this._onChange} />
          )
        }

        {
          submitting &&
          <View style={{marginLeft:'45%'}} >
            <Bars size={10} color="#FDAAFF" />
          </View>
        }
         {
              paymentSuccess && <Text style={{marginLeft:'40%'}} className="success">Payment Success</Text>
          }
        <Button
          style={{ fontSize: 20, color: 'green' }}
          styleDisabled={{ color: 'red' }}
          onPress={() => this.submit()}
          title="Submit"
        >
          Submit
        </Button>

      </View>
    );
  }
}
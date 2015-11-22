'use strict';

import React from 'react-native';
import { FocalPoints, FocalPoint } from 'rn-focalpoint';
import theme from './theme';

const {
    View,
    Text,
    TouchableHighlight,
    TextInput,
    ActivityIndicatorIOS,
    AppRegistry
} = React;

class FocalPointExample extends React.Component {
    constructor(props){
        super(props);
        this.state = { loading: false };
    }
    onDone(){
        this.setState({ loading: true });
    }
    render(){
        const style = this.props.style.login;
        const { input, button, vgroup } = this.props.style;
        return (
            <View style={style.container}>
                <View style={style.logoContainer}>
                    <Text style={style.logo}></Text>
                </View>
                <View style={style.form}>
                    <FocalPoints onDone={() => this.onDone()} style={vgroup.form}>
                        <View style={[vgroup.top, vgroup.seperator]}>
                            <FocalPoint>
                                <TextInput
                                    style={[input.text, vgroup.input]}
                                    placeholder="username"
                                    value={this.state.username}
                                    onChangeText={(username) => this.setState({username})}
                                />
                            </FocalPoint>
                        </View>
                        <View style={vgroup.seperator}>
                            <FocalPoint>
                                <TextInput
                                    style={[input.text, vgroup.input]}
                                    placeholder="password"
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={(password) => this.setState({password})}
                                />
                            </FocalPoint>
                        </View>
                        <FocalPoint isEnd={true}>
                            <TextInput
                                style={[input.text, vgroup.input]}
                                placeholder="access code"
                                value={this.state.access}
                                onChangeText={(access) => this.setState({access})}
                            />
                        </FocalPoint>
                    </FocalPoints>
                    <TouchableHighlight
                        onPress={() => this.onDone()}
                        style={[button.touch, style.loginButton]}>
                        <View style={[button.base, button.primary]}>
                            <Text style={[button.content, button.primaryContent]}>
                                Login
                            </Text>
                            <ActivityIndicatorIOS
                                animating={this.state.loading}
                                style={style.loading}
                                color="white"
                            />
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={style.toolbox}>
                    <View style={style.options}>
                        <View style={style.option}>
                            <TouchableHighlight>
                                <Text style={[style.text, style.strong]}>
                                    Sign Up
                                </Text>
                            </TouchableHighlight>
                        </View>
                        <View style={style.option}>
                            <TouchableHighlight>
                                <Text style={style.text}>
                                    Forgotten password?
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

FocalPointExample.propTypes = {
    style: React.PropTypes.object
};

FocalPointExample.defaultProps = {
    style: theme
};

AppRegistry.registerComponent('example', () => FocalPointExample);

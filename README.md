# rn-focalpoint

Create a high-level focus chain in React Native without the boilerplate.

![example](http://i.imgur.com/fIRLVv7.gif)

Source available in the `/example` directory.

### Install

```
npm install alexcurtis/rn-focalpoint --save
```

### Quick Start

```javascript
'use strict';

import React from 'react-native';
import { FocalPoints, FocalPoint } from 'rn-focalpoint';

const { View, TextInput, StyleSheet, AppRegistry } = React;

const styles = StyleSheet.create({
    container: {
        top: 75,
        padding: 10
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
});

class FocalPointExample extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    onDone(){/* ... */}
    render(){
        return (
            <View style={styles.container}>
                <FocalPoints onDone={() => this.onDone()}>
                    <FocalPoint>
                        <TextInput
                            style={styles.input}
                            placeholder="username"
                            value={this.state.username}
                            onChangeText={(username) => this.setState({username})}
                        />
                    </FocalPoint>
                    <FocalPoint>
                        <TextInput
                            style={styles.input}
                            placeholder="password"
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                        />
                    </FocalPoint>
                    <View>
                        <View>
                            <FocalPoint isEnd={true}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="access code"
                                    value={this.state.access}
                                    onChangeText={(access) => this.setState({access})}
                                />
                            </FocalPoint>
                        </View>
                    </View>
                </FocalPoints>
            </View>
        );
    }
}

AppRegistry.registerComponent('example', () => FocalPointExample);
```

### &lt;FocalPoint&gt;

Wraps a single component and makes it a point on the focus chain. Currently supports TextInput.

#### index
`React.PropTypes.number`

Optional Zero-based integer that explicitly sets the order in which the focus moves between focal points. You do not need to set this, if you simply want the chain to based on the hierarchical positions in the component tree.

#### isEnd
`React.PropTypes.bool`

Sets the point to be the last, in the focus chain. This will decorate the keyboard with `kbDoneKey` and invoke the `onDone` callback (see below) when the user has completed.

### &lt;FocalPoints&gt;

Top level component, that groups &lt;FocalPoint&gt; components into declarative chains.

#### onDone
`React.PropTypes.func`

Optional callback that is invoked when the user has completed the last focal point in the chain. It is the equivalent of a form submit.

#### kbNextKey
`React.PropTypes.string`

The keyboard return key used to move onto the next point in the chain. See [returnKeyType](https://facebook.github.io/react-native/docs/textinput.html) for values. Defaults to 'next';

#### kbDoneKey
`React.PropTypes.string`

The keyboard return key used to complete the chain. See [returnKeyType](https://facebook.github.io/react-native/docs/textinput.html) for values. Defaults to 'done';

#### blurOnSubmit
`React.PropTypes.bool`

Should the component blur on submit. If false, the blur will not execute and the keyboard will not flicker between submit requests. Defaults to false. React Native 0.15+ support.

#### style
`View.propTypes.style`

Sets the style for the top level View that wraps the focal points.

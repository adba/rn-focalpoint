'use strict';

import React from 'react-native';
import rutils from 'react-utils';

const SUPPORTED_INPUTS = ['TextInput'];

class FocalPoint extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        this.context.addFocalPoint(this, this.props.index);
    }
    componentWillUnmount(){
        this.context.removeFocalPoint(this.props.index);
    }
    getOnSubmitEditingHandler(child){
        return () => {
            this.context.focusOnPoint(child, this.props.index);
            const onSubmitEditing = child.props.onSubmitEditing;
            if(onSubmitEditing){ onSubmitEditing(); }
        };
    }
    getOnBlurHandler(child, options){
        return () => {
            if(this.props.isEnd && options.onDone){ options.onDone(); }
            const onBlur = child.props.onBlur;
            if(onBlur){ onBlur(); }
        };
    }
    getKeyboardKey(child, options){
        const override = child.props.returnKeyType;
        if(override){ return override; }
        const isEnd = this.props.isEnd;
        return isEnd ? options.kbDoneKey : options.kbNextKey;
    }
    getBlurOnSubmit(child, options){
        const override = child.props.blurOnSubmit;
        return override ? override : options.blurOnSubmit;
    }
    render(){
        const options = this.context.getFocalPointOptions();
        const child = this.props.children;
        const onSubmitEditing = this.getOnSubmitEditingHandler(child);
        const onBlur = this.getOnBlurHandler(child, options);
        const reference = child.ref || `focal-${this.props.index}`;
        const blurOnSubmit = this.getBlurOnSubmit(child, options);
        const returnKeyType = this.getKeyboardKey(child, options);
        const element = React.cloneElement(child, {
            ref: reference,
            returnKeyType: returnKeyType,
            blurOnSubmit: blurOnSubmit,
            onSubmitEditing: onSubmitEditing,
            onBlur: onBlur
        });
        this.fpReference = reference;
        return element;
    }
}

FocalPoint.contextTypes = {
    addFocalPoint: React.PropTypes.func,
    removeFocalPoint: React.PropTypes.func,
    focusOnPoint: React.PropTypes.func,
    getFocalPointOptions: React.PropTypes.func
};

FocalPoint.propTypes = {
    index: React.PropTypes.number.isRequired,
    isEnd: React.PropTypes.bool,
    children: function(props, name, component){
        const prop = props[name];
        const count = rutils.children.count(prop);
        if(count !== 1 || SUPPORTED_INPUTS.indexOf(prop.type.displayName) === -1){
            const types = SUPPORTED_INPUTS.join(', ');
            return new Error(`${component} should have a single child of the following types: ${types}`);
        }
    }
};

export default FocalPoint;

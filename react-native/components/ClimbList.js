import React, { Component } from 'react';
import {
    FlatList
} from 'react-native';
import ClimbDataRow from './../components/ClimbDataRow';
import NoClimbsComponent from './../components/NoClimbsComponent';

class ClimbList extends Component {
    constructor(props) {
        super(props);

        this._flatList = React.createRef();
    }
    render() {
        const { 
            data,
            selectedKey,
            onRowPress
        } = this.props;

        return (
            <FlatList
                data={data}
                keyExtractor={(item) => item.key.toString()}
                renderItem={(data) => (
                    <ClimbDataRow 
                        difficulty={data.item.route.difficulty}
                        sentIt={data.item.sentIt}
                        isSelected={data.item.key === selectedKey}
                        onPress={onRowPress.bind(data.item.key)}
                    />
                )}
                ListEmptyComponent={<NoClimbsComponent />}
                ref={this._flatList}
                onContentSizeChange={this.scrollToEnd.bind(this)}
            />
        );
    }

    scrollToEnd() {
        this._flatList.current.scrollToEnd();
    }
}

export default ClimbList;

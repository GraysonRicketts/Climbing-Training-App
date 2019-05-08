import React from 'react';
import { Component } from 'react';
import { FlatList } from 'react-native';
import ClimbDataRow from './ClimbDataRow';
import NoClimbsComponent from './NoClimbsComponent';

interface IClimbListProps {
    data: any // TODO: typecheck
    selectedKey: any // TODO: typecheck
    onRowPress: Function
}

class ClimbList extends Component<IClimbListProps> {
    readonly _flatList: React.RefObject<FlatList<any>>; // TODO: typecheck

    constructor(props: IClimbListProps) {
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
        if (!this._flatList.current) {
            return;
        }
        
        this._flatList.current.scrollToEnd();
    }
}

export default ClimbList;

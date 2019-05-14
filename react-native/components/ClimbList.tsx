import React from 'react';
import { Component } from 'react';
import { FlatList } from 'react-native';
import ClimbDataRow from './ClimbDataRow';
import NoClimbsComponent from './NoClimbsComponent';
import { Climb } from '../util/Climbs';

interface IClimbListProps {
    data: Climb[]
    selectedKey?: number
    onRowPress: Function
}

class ClimbList extends Component<IClimbListProps> {
    readonly _flatList: React.RefObject<FlatList<Climb>>;

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
                        sentIt={data.item.completed}
                        isSelected={data.item.key === selectedKey}
                        onPress={onRowPress}
                        climbKey={data.item.key}
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

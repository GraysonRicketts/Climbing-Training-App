import React, { Component } from 'react';

import { FlatList } from 'react-native';
import ClimbDataRow from './ClimbDataRow';
import NoClimbsComponent from './NoClimbsComponent';
import { Climb } from '../util/Climbs';

interface ClimbListProps {
    data: Climb[];
    selectedKey?: number;
    onRowPress: Function;
}

class ClimbList extends Component<ClimbListProps> {
    private readonly flatList: React.RefObject<FlatList<Climb>>;

    public constructor(props: ClimbListProps) {
        super(props);

        this.flatList = React.createRef();
        this.scrollToEnd = this.scrollToEnd.bind(this);
    }

    public scrollToEnd() {
        if (!this.flatList.current) {
            return;
        }

        this.flatList.current.scrollToEnd();
    }

    public render() {
        const {
            data,
            selectedKey,
            onRowPress,
        } = this.props;

        return (
            <FlatList
                ListEmptyComponent={<NoClimbsComponent />}
                data={data}
                keyExtractor={item => item.key.toString()}
                onContentSizeChange={this.scrollToEnd}
                ref={this.flatList}
                renderItem={(listItem) => {
                    const climb = listItem.item;
                    return (
                        <ClimbDataRow
                            climbKey={climb.key}
                            difficulty={climb.route.difficulty}
                            isSelected={climb.key === selectedKey}
                            modifier={climb.modifier}
                            onPress={onRowPress}
                        />
                    );
                }}
            />
        );
    }
}

export default ClimbList;

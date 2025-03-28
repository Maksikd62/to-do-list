import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { View, Text, StyleSheet } from 'react-native';

function TabBarIcon({ name, color, badge }: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string; badge?: number }) {
    return (
        <View style={{ position: 'relative' }}>
            <FontAwesome size={28} style={{ marginBottom: -3 }} name={name} color={color} />
            {badge && badge > 0 ? (
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{badge}</Text>
                </View>
            ) : null}
        </View>
    );
}

export default function TabLayout() {
    const inProgressCount = useSelector((state: RootState) => state.tasks.inProgressCount);

    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />
                }} />
            <Tabs.Screen
                name="list"
                options={{
                    title: 'To do list',
                    tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} badge={inProgressCount} />
                }} />
            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />
                }} />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    badgeContainer: {
        position: 'absolute',
        right: -5,
        top: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

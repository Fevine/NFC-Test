import { StyleSheet } from 'react-native';
import MainNavigation from './MainNavigation';

export default function App() {
  return (
    <MainNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

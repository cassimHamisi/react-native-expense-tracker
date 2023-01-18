import { StyleSheet, View } from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ color, size, onPress, icon }) => {
  return (
    <Pressable onPress={onPress} style={(pressed) => pressed && styles.pressed}>
      <View style={styles.rootView}>
        <Ionicons color={color} name={icon} size={size} />
      </View>
    </Pressable>
  );
};

export default IconButton;
const styles = StyleSheet.create({
  rootView: {
    marginHorizontal: 8,
    marginVertical: 3,
    padding: 6,
    borderRadius: 24,
  },
  pressed: {
    opacity: 0.75,
  },
});

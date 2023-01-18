import { StyleSheet, Text, TextInput, View } from "react-native";
import GlobalStyles from "../../constants/styles";

function Input({ label, invalid, textInputProps, style }) {
  const inputStyle = [styles.textInputStyle];

  if (textInputProps && textInputProps.multiline) {
    inputStyle.push(styles.multiLineStyle);
  }
  return (
    <View style={[styles.viewRoot, style]}>
      <Text style={[styles.textLabel, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        {...textInputProps}
        style={[inputStyle, invalid && styles.invalidTextInput]}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  viewRoot: {
    marginHorizontal: 7,
    marginVertical: 10,
  },
  textLabel: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  textInputStyle: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  multiLineStyle: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidTextInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});

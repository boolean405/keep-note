import { View, Text, StyleSheet } from "react-native";

const NoteItem = ({ note }) => {
  
  return (
    <View style={styles.noteItem}>
      <View>
        <Text style={styles.noteTitle}>{note.title}</Text>
        <Text style={styles.noteText}>{note.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  noteText: {
    fontSize: 15,
    fontWeight: "ultralight",
  },
});

export default NoteItem;

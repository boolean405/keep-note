import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import NoteList from "../../../components/NoteList";


const NoteScreen = () => {
  let notesData = [
    {
      _id: "1",
      title: "Title 1",
      text: "Note one",
    },
    {
      _id: "2",
      title: "Title 2",
      text: "Note two",
    },
    {
      _id: "3",
      title: "Title 3",
      text: "Note three",
    },
  ];
  const [notes, setNotes] = useState(notesData);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newText, setNewText] = useState("");

  const addNote = () => {
    if ((newText.trim() && newTitle.trim()) === "") return;

    setNotes((prevNotes) => [
      ...prevNotes,
      { _id: Date.now.toString(), title: newTitle, text: newText },
    ]);

    // clear input
    setNewTitle("");
    setNewText("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <NoteList notes={notes} />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a new note</Text>
            <View>
              <TextInput
                style={styles.modalTextInput}
                placeholder="Title"
                placeholderTextColor="gray"
                value={newTitle}
                onChangeText={setNewTitle}
              />
              <TextInput
                style={styles.modalTextInput}
                placeholder="Enter note..."
                placeholderTextColor="gray"
                value={newText}
                onChangeText={setNewText}
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={addNote}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
  },
  addButton: {
    position: "absolute",
    bottom: 40,
    right: 40,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    verticalAlign: "auto",
  },
  modalButtons: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 20,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "black",
  },
  saveButton: {
    backgroundColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "white",
  },
});

export default NoteScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';

const CustomCheckBox = ({ isChecked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
        {isChecked && <Text style={styles.checkMark}>✔</Text>}
      </View>
    </TouchableOpacity>
  );
};

const SelectDropDown = ({
  label,
  options,
  selectedValues,
  onSelect,
  placeholder,
  isMultipleSelect = true,
  isRequired = false, // New prop to indicate if the field is required
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState(selectedValues || []);

  // Handle the search input and filter options based on search query
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredData = options.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filteredData);
  };

  // Toggle selection of an individual option
  const handleSelect = (value) => {
    if (!isMultipleSelect) {
      // If multiple select is disabled, just select one value
      setSelectedOptions([value]);
    } else {
      setSelectedOptions((prevSelectedOptions) => {
        if (prevSelectedOptions.includes(value)) {
          return prevSelectedOptions.filter((option) => option !== value);
        } else {
          return {...prevSelectedOptions, value};
        }
      });
    }
  };

  // Select all options
  const handleSelectAll = () => {
    if (selectedOptions.length === filteredOptions.length) {
      setSelectedOptions([]);
    } else {
      setSelectedOptions(filteredOptions.map((option) => option.value));
    }
  };

  // Pass the selected options to the parent component
  useEffect(() => {
    onSelect(selectedOptions);
  }, [selectedOptions]);

  const getSelectedLabel = () => {
    if (selectedOptions.length === 0) {
      return placeholder;
    }

    const selectedLabels = options
      .filter((option) => selectedOptions.includes(option.value))
      .map((option) => option.label);

    return isMultipleSelect
      ? selectedLabels.join(', ') // Multiple selection will show all selected names
      : selectedLabels[0] || 'No Assignees Selected'; // Single selection will show only one name
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {isRequired && <Text style={styles.required}>*</Text>}
      </View>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.inputText}>{getSelectedLabel()}</Text>
      </TouchableOpacity>

      {isOpen && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={isOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={handleSearch}
              />

              {/* Select All Checkbox (only when multiple select is enabled) */}
              {isMultipleSelect && (
                <View style={styles.selectAllContainer}>
                  <CustomCheckBox
                    isChecked={selectedOptions.length === filteredOptions.length}
                    onToggle={handleSelectAll}
                  />
                  <Text style={styles.selectAllText}>Select All</Text>
                </View>
              )}

              <FlatList
                data={filteredOptions}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(item.value)}
                  >
                    <View style={styles.optionContainer}>
                      <CustomCheckBox
                        isChecked={selectedOptions.includes(item.value)}
                        onToggle={() => handleSelect(item.value)}
                      />
                      <Text style={styles.optionText}>{item.label}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsOpen(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  required: {
    fontSize: 16,
    color: 'red',
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  inputText: {
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    height: 380,
    borderRadius: 10,
    padding: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 9,
    backgroundColor: '#DBDBDBAB',
  },
  selectAllText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#007BFF',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#007BFF',
  },
  checkMark: {
    color: '#fff',
    fontSize: 8,
  },
});

export default SelectDropDown;

import React, {useState, forwardRef, ForwardedRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import {LoanCollateralType} from '../../api/types/loanRequest';
import {AppIcons} from '../../icons';

interface CustomMultiSelectProps {
  value: string[];
  options: Array<{value: string; label: string}>;
  placeholder: string;
  onChange: (value: string[]) => void;
  onItemSelect: (value: LoanCollateralType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CustomMultiSelect = forwardRef(
  (
    {
      value,
      options,
      placeholder,
      onChange,
      onItemSelect,
      isOpen,
      setIsOpen,
    }: CustomMultiSelectProps,
    ref: ForwardedRef<View>,
  ) => {
    const [inputLayout, setInputLayout] = useState({
      pageY: 0,
      height: 0,
    });

    const styles = StyleSheet.create({
      multiSelectContainer: {
        position: 'relative',
      },
      inputContainer: {
        backgroundColor: '#f4f4f4',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 8,
        minHeight: 45,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
      },
      tagsContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
      },
      tag: {
        backgroundColor: '#e3f0ff',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8,
      },
      tagText: {
        color: '#007BFF',
        fontSize: 14,
        marginRight: 4,
      },
      removeTag: {
        color: '#007BFF',
        fontSize: 16,
        fontWeight: '600',
      },
      rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      clearAll: {
        padding: 8,
        marginRight: 4,
      },
      clearAllText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '500',
      },
      arrowIcon: {
        width: 18,
        height: 18,
      },
      placeholder: {
        color: '#999',
        fontSize: 14,
      },
      dropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: 'white',
        marginTop: 4,
        borderRadius: 8,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        zIndex: 1000,
      },
      option: {
        padding: 12,
        borderRadius: 6,
        marginVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      optionSelected: {
        backgroundColor: '#f0f9ff',
      },
      optionText: {
        fontSize: 14,
        color: '#333',
      },
      checkmark: {
        color: '#007BFF',
        fontWeight: 'bold',
      },
      modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
      },
      modalContent: {
        position: 'absolute',
        top: inputLayout.pageY + inputLayout.height + 4, // 4px spacing from input
        left: 16,
        right: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        maxHeight: 300, // Giới hạn chiều cao tối đa
      },
      optionsContainer: {
        width: '100%',
      },
      optionsScrollView: {
        maxHeight: 280, // Để có thể scroll nếu nhiều options
      },
    });

    const measureInput = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.measure((x, y, width, height, pageX, pageY) => {
          setInputLayout({
            pageY: pageY,
            height: height,
          });
        });
      }
    };

    useEffect(() => {
      if (isOpen) {
        measureInput();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
      <View
        ref={ref}
        style={styles.multiSelectContainer}
        onLayout={measureInput}>
        <TouchableOpacity
          style={styles.inputContainer}
          onPress={() => setIsOpen(!isOpen)}
          activeOpacity={0.7}>
          <View style={styles.tagsContainer}>
            {value.length > 0 ? (
              value.map((type: string) => {
                const item = options.find(t => t.value === type);
                return (
                  <View key={type} style={styles.tag}>
                    <Text style={styles.tagText}>{item?.label}</Text>
                    <TouchableOpacity
                      onPress={e => {
                        e.stopPropagation();
                        onItemSelect(type as LoanCollateralType);
                      }}>
                      {/* <Text style={styles.removeTag}>×</Text> */}
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <Text style={styles.placeholder}>{placeholder}</Text>
            )}
          </View>
          <View style={styles.rightContainer}>
            {value.length > 0 && (
              <TouchableOpacity
                style={styles.clearAll}
                onPress={e => {
                  e.stopPropagation();
                  onChange([]);
                }}>
                <Text style={styles.clearAllText}>×</Text>
              </TouchableOpacity>
            )}
            <Image
              source={isOpen ? AppIcons.chevronUp : AppIcons.chevronDown}
              style={styles.arrowIcon}
            />
          </View>
        </TouchableOpacity>

        <Modal
          visible={isOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsOpen(false)}>
            <View style={styles.modalContent}>
              <View style={styles.optionsContainer}>
                {options.map(item => {
                  const isSelected = value.includes(item.value);
                  return (
                    <TouchableOpacity
                      key={item.value}
                      style={[
                        styles.option,
                        isSelected && styles.optionSelected,
                      ]}
                      onPress={e => {
                        e.stopPropagation(); // Ngăn không cho sự kiện bubble lên trên
                        onItemSelect(item.value as LoanCollateralType);
                      }}>
                      <Text style={styles.optionText}>{item.label}</Text>
                      {isSelected && <Text style={styles.checkmark}>✓</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  },
);

export default CustomMultiSelect;

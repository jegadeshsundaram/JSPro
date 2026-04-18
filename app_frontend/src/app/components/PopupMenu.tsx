import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Text, View } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger
} from 'react-native-popup-menu';

type props = {
  onOptionSelect: (value: string, id: number) => void;
  options: { icon: string, label: string; value: string, action: string }[];
  triggerText?: string;
  dynamicValue: number;
};

const PopupMenu: React.FC<props> = ({
  onOptionSelect,
  options,
  triggerText = '⋮',
  dynamicValue = 0
}) => {
  return (
    <View>
      <Menu>
        <MenuTrigger>
          <Text style={styles.triggerText}>{triggerText}</Text>
        </MenuTrigger>
        <MenuOptions>
          {options.map(option => (
            <MenuOption
              style={styles.optionBox}
              key={option.value}
              onSelect={() => onOptionSelect(option.action, dynamicValue)}>
              <FontAwesome name={option.icon as any} style={styles.optionIcon}  />
              <Text style={styles.optionText}>                
                {option.label}
              </Text>
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  triggerText: {
    padding: 5,
    fontSize: 28,
    color: '#333',
    textAlign: 'center',
  },  
  optionBox: {
    borderWidth: 1,
    borderColor: '#ece3e3ff',
    flexDirection: 'row',
    padding: 10,
  },
  optionIcon: {
    width: '30%',
    fontSize: 20,
    color: '#000000',    
    textAlignVertical: 'center',
    textAlign: 'center',    
  },
  optionText: {    
    width: '70%',
    fontSize: 16,
    color: '#000',
  },
  
})

export default PopupMenu
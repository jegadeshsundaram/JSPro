import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

type props = {
  dialogVisibility: boolean,
  onCancelClick: () => void;
  onConfirmClick: (id: number | string) => void;
  dialogTitle: string;
  dialogContent: string;
  buttonCancelText: string;
  buttonConfirmText: string;
  inputValue: number | string;
};

const ConfirmDialog: React.FC<props> = ({
  dialogVisibility = false,
  onCancelClick,
  onConfirmClick,
  dialogTitle = 'Confirm',
  dialogContent = 'Are you sure?',
  buttonCancelText = "Cancel",
  buttonConfirmText = "Ok",
  inputValue = 0
}) => {

  return (
    <Portal>
      <Dialog visible={dialogVisibility} onDismiss={() => onCancelClick()} style={styles.dialogContainer}>
        <Dialog.Title style={styles.dialogHeader}>{dialogTitle}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium" style={styles.dialogContent}>{dialogContent}</Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogButtonsContainer}>
          <Button onPress={() => onCancelClick()} textColor='#000' style={styles.dialogButtonCancel}>{buttonCancelText}</Button>
          <Button onPress={() => onConfirmClick(inputValue)} textColor='#000' style={styles.dialogButtonConfirm}>{buttonConfirmText}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  dialogHeader: {
    color: '#000000',
    fontSize: 20,
  },
  dialogContent: {
    color: '#1c1a1aff',
    fontSize: 15,
    fontStyle: 'italic'
  },
  dialogButtonsContainer: {
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 15,
    borderTopColor: '#ccc'
  },
  dialogButtonCancel: {
    borderWidth: 1,
    borderColor: '#000000',
    color: '#000000',
    borderRadius: 5,
    width: 100,
    height: 40,
  },
  dialogButtonConfirm: {
    backgroundColor: '#f09a9aff',
    borderRadius: 5,
    width: 100,
    height: 40,
  }
})

export default ConfirmDialog;
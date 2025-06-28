import React, {JSX} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import {
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {CrossedIcon} from '../../assets/Icons';
import {horizontalScale} from '../../helper/scaleHelper';
import theme from '../../Constants/theme';

export const TestId_AppBottomSheetContainer = 'TestId_AppBottomSheetContainer';
export const TestID_AppBottomSheet_CloseButton =
  'TestID_AppBottomSheet_CloseButton';

export type OnLayout = (event: LayoutChangeEvent) => void;

interface Props {
  isOpen: boolean;
  onHide: () => void;
  children: React.ReactNode;
  snapPoints?: string;
  crossIconSize?: boolean;
  isScrollable?: boolean;
}

const AppBottomSheet = ({
  isOpen,
  onHide,
  children,
  snapPoints,
  crossIconSize,
  isScrollable,
}: Props) => {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const resolvedSnapPoints = React.useMemo(
    () => [snapPoints ?? '50%'],
    [snapPoints],
  );

  const handleSheetChanges = React.useCallback(
    (index: number) => {
      if (index === -1) {
        onHide();
      }
    },
    [onHide],
  );

  React.useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  const renderBackdrop = React.useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <View testID={TestId_AppBottomSheetContainer} style={styles.fullScreen}>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        enableContentPanningGesture={isScrollable ? false : true}
        snapPoints={resolvedSnapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.handleIndicator}>
        <BottomSheetView style={styles.sheetContent}>
          {crossIconSize ?? (
            <TouchableOpacity
              onPress={onHide}
              testID={TestID_AppBottomSheet_CloseButton}>
              <CrossedIcon style={styles.crossIcon} />
            </TouchableOpacity>
          )}

          {children}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  handleIndicator: {
    display: 'none',
  },
  crossIcon: {
    alignSelf: 'flex-end',
    marginRight: horizontalScale(theme.spacing.spacing_16),
  },
  sheetContent: {
    flex: 1,
  },
});

export default AppBottomSheet;

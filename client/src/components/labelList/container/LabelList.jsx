import React, { useContext, useState } from 'react';
import { LabelsContext } from '../../../stores/LabelStore';
import CountOfLabels from '../presentational/CountOfLabels';
import LabelListWrapper from '../layouts/LabelListWrapper';
import LabelItemWrapper from '../layouts/LabelItemWrapper';
import LabelItemName from '../presentational/LabelItemName';
import LabelItemDescription from '../presentational/LabelItemDescription';
import LabelItemButtons from '../presentational/LabelItemButtons';
import LabelInputForm from '../presentational/LabelInputForm';
import { getRandomColorCode } from '../../../utils/utils';
import { labelAPI } from '../../../apis/api';

export default function LabelList() {
  const { labels, dispatch } = useContext(LabelsContext);
  const inactiveEditState = false;
  const [editState, setEditState] = useState(inactiveEditState);

  const [labelName, setLabelName] = useState('');
  const initLabelName = ({ target }) => {
    setLabelName(target.value);
  };

  const [labelDescription, setLabelDescription] = useState('');
  const initLabelDescription = ({ target }) => {
    setLabelDescription(target.value);
  };

  const [labelColor, setLabelColor] = useState('');
  const initLabelColor = ({ target }) => {
    setLabelColor(target.value);
  };

  const makeRandomColor = () => {
    setLabelColor(getRandomColorCode());
  };

  const updateLabel = async () => {
    const labelData = {
      id: editState,
      name: labelName,
      color: labelColor,
      description: labelDescription,
    };

    const result = await labelAPI.update(labelData);
    if (!result) return;

    dispatch({ type: 'UPDATE', payload: labelData });
  };

  const editEvent = (label) => {
    console.log('label', label);
    setEditState(label.id);
    setLabelName(label.name);
    setLabelDescription(label.description);
    setLabelColor(label.color);
  };

  const deleteEvent = async (label) => {
    const result = await labelAPI.remove(label.id);
    if (!result) return;
    dispatch({ type: 'DELETE', payload: { id: label.id } });
  };

  return (
    <LabelListWrapper>
      <CountOfLabels count={labels?.length} />
      {
        labels.map((label) => {
          if (editState !== label.id) {
            return (
              <LabelItemWrapper>
                <LabelItemName name={label.name} color={label.color} />
                <LabelItemDescription description={label.description} />
                <LabelItemButtons
                  editState={editState !== label.id}
                  editEvent={() => editEvent(label)}
                  deleteEvent={() => deleteEvent(label)}
                />
              </LabelItemWrapper>
            );
          }

          return (
            <LabelInputForm
              labelName={labelName}
              description={labelDescription}
              color={labelColor}
              saveText="Save changes"
              onClick={makeRandomColor}
              onChangeName={initLabelName}
              onChangeDescription={initLabelDescription}
              onChangeColor={initLabelColor}
              onSave={updateLabel}
            />
          );
        })
      }
    </LabelListWrapper>
  );
}

import React, { useContext, useState } from 'react';
import { LabelsContext } from '../../../stores/LabelStore';
import LabelItem from '../presentational/LabelItem';
import CountOfLabels from '../presentational/CountOfLabels';
import LabelListWrapper from '../layouts/LabelListWrapper';

export default function LabelList() {
  const { labels, dispatch } = useContext(LabelsContext);
  const inactiveEditState = false;
  const { editState, toggleEditState } = useState(inactiveEditState);

  return (
    <LabelListWrapper>
      <CountOfLabels count={labels?.length} />
      {
        labels.map((label) => (
          <LabelItem
            name={label.name}
            color={label.color}
            description={label.description}
            editState={editState}
            editEvent={() => toggleEditState(!editState)}
            deleteEvent={() => {
              // TODO : 라벨 삭제 API 연동
              dispatch({ type: 'DELETE', payload: { id: label.id } });
            }}
            updateEvent={() => {
              // TODO : 라벨 갱신 API 연동
              dispatch({ type: 'UPDATE', payload: { } });
            }}
          />
        ))
      }
    </LabelListWrapper>
  );
}

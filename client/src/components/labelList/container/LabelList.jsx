import React, { useContext, useState } from 'react';
import { LabelsContext } from '../../../stores/LabelStore';
import CountOfLabels from '../presentational/CountOfLabels';
import LabelListWrapper from '../layouts/LabelListWrapper';
import LabelItemWrapper from '../layouts/LabelItemWrapper';
import LabelItemName from '../presentational/LabelItemName';
import LabelItemDescription from '../presentational/LabelItemDescription';
import LabelItemButtons from '../presentational/LabelItemButtons';

export default function LabelList() {
  const { labels, dispatch } = useContext(LabelsContext);
  const inactiveEditState = false;
  const { editState, toggleEditState } = useState(inactiveEditState);

  return (
    <LabelListWrapper>
      <CountOfLabels count={labels?.length} />
      {
        labels.map((label) => (
          <LabelItemWrapper>
            <LabelItemName name={label.name} color={label.color} />
            <LabelItemDescription description={label.description} />
            <LabelItemButtons
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
          </LabelItemWrapper>
        ))
      }
    </LabelListWrapper>
  );
}

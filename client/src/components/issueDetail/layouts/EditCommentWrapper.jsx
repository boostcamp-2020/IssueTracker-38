import styled from '@emotion/styled';

export const EditCommentTitleWrapper = styled.div`

        background-color: white;
        width: 60px;
        margin: 10px 10px -1px 10px;
        padding: 5px 0;
        text-align: center;
        border: 1px solid #e1e4e8;
        border-radius: 6px 6px 0 0;
        border-bottom: 0;`;

export const EditCommentTextInputWrapper = styled.textarea`
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        box-shadow: 0px 0px 5px #e1e4e8;
        width: 100%;
        height: 150px;
        margin: 20px 10px 10px 10px;
        padding: 10px;
        & : focus {
            background-color: #f6f8fa;
            outline: none;
          };
       `;


/* '&:focus': {
            backgroundColor: '#f6f8fa',
            outline: 'none',
        };*/
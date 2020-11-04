export default {
  body: {
    margin: '40px 0px',
    display: 'flex',
  },
  profile: {
    width: '40px',
    height: '40px',
    backgroundColor: 'skyblue',
    borderRadius: '3px',
  },
  layout: {
    marginLeft: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    width: '800px',
    border: '1px solid #e1e4e8',
    borderRadius: '6px 6px 0 0',
  },
  title: {
    borderBottom: '1px solid #e1e4e8',
    backgroundColor: '#f6f8fa',
    width: '100%',
  },
  contentWrapper: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  content: {
    margin: '10px',
  },
  textInput: {
    border: '1px solid #e1e4e8',
    borderRadius: '6px',
    boxShadow: '0px 0px 5px #e1e4e8',
    width: '100%',
    height: '150px',
    margin: '20px 10px 10px 10px',
    padding: '10px',
    '&:focus': {
      backgroundColor: '#f6f8fa',
      outline: 'none',
    },
  },
  statusButton: {
    margin: '0 10px 10px auto',
    padding: '5px 16px',
    borderRadius: '6px',
    border: '1px solid #e1e4e8',
    fontWeight: '600',
  },
  commentButton: {
    backgroundColor: '#94d3a2', // #2ea44f
    color: 'white',
    padding: '5px 16px',
    margin: '0 10px 10px 10px',
    borderRadius: '6px',
    border: '1px solid #e1e4e8',
    fontWeight: '600',
  },
};

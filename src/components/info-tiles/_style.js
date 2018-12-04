export const getListStyle = () => ({
    display: 'block',
    width: '300px',
    boxShadow: 'none'
});

export const getTitleStyle = () => ({
    ...getItemStyle(),
    fontSize: 18,
    backgroundColor: '#00aeae'
})

export const getItemStyle = () => ({
    backgroundColor: '#1b292c',
    fontSize: 12,
    //marginTop: 10,
    fontWeight: '700',
    lineHeight: '120px',
    color: '#fff',
    marginLeft: 0,
    padding: '10px 10px 10px 10px',
    minHeight: 48,
    position: 'relative',
     textAlign: 'center',
    //borderTop: '0px solid #00aeae'
});
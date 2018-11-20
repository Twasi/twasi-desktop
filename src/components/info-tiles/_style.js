export const getListStyle = () => ({
    display: 'block',
    width: '200px',
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
    fontWeight: '600',
    lineHeight: '48px',
    color: '#fff',
    marginLeft: 0,
    padding: '0px 16px 0px 16px',
    minHeight: 48,
    position: 'relative',
    textAlign: 'center',
    borderTop: '1px solid #00aeae'
});
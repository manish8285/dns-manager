export const getToken = () =>
    {
        try
        {
            const token = localStorage.getItem('token');
            console.log('token service ',token)
            if (token)
            {
                return token;
            } else
            {
                throw null;
            }
            
        } catch (error)
        {
            return null
        }
    }
    
    export const setToken = (token) =>
        {
            try
            {
                localStorage.setItem('token', token)
                
            } catch (error)
            {
                return null
            }
        }
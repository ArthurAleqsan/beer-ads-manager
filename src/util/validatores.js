export const validateRows = (rows) => {
    let status = true;
    console.log(rows[0].tv_s)
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < rows[i].tv_s.length; j++) {
            if (!rows[i].tv_s[j]) {
                status = false;
            }
        }
    }
    return status;
}
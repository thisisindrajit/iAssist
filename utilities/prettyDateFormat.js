const convertToPrettyDateFormat = (seconds) => {
    let createdDate = new Date(seconds * 1000);
  
    const date = createdDate.getDate();
    const month = createdDate.getMonth() + 1;
    const year = createdDate.getFullYear();
  
    const hours =
      createdDate.getHours() > 12
        ? createdDate.getHours() - 12
        : createdDate.getHours() === 0
        ? 12
        : createdDate.getHours();
  
    const minutes =
      createdDate.getMinutes() < 10
        ? "0" + createdDate.getMinutes()
        : createdDate.getMinutes();
    const amOrPm = createdDate.getHours() >= 12 ? "PM" : "AM";
  
    let fullDate = `${date}/${month}/${year}`;
  
    let today = new Date();
  
    if (
      createdDate.toLocaleDateString() ===
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      ).toLocaleDateString()
    ) {
      fullDate = "TODAY";
    }
  
    return `${fullDate} at ${hours}:${minutes} ${amOrPm}`;
  };
  
  export default convertToPrettyDateFormat;
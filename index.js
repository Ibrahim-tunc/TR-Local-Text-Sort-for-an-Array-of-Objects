getDealers();
function getDealers(){
    const sellerList = [];
    $(document).ready(function() {  
        $.ajax({  
            type: "POST",  
            url: "https://turkuazwebapitest.doas.com.tr/Authentication/login",
            contentType: "application/json",  
            dataType: "json",
            headers: {
                'x-application-key': 'f2beb286-7a8f-487e-b214-19c2eece2045'
            },
            success: function(data, textStatus, jqXHR) {
                GetDealers(data.Data.Token, 'VW');
            }
        });
    });
    function GetDealers(token, brandCode) {
        $.ajax({  
            type: "GET",  
            url: "https://turkuazwebapitest.doas.com.tr/LeadSystem/GetDealers?brandCode=" + brandCode,
            contentType: "application/json",  
            dataType: "json",
            headers: {
                'x-authorization-token': token
            },
            success: function(data, textStatus, jqXHR) {
                console.log(data.Data)
                sortSellers(data.Data);
            }
        });
    }
    function sortSellers(list){
        const sellerList = [];
        for(let i=0; i<list.length; i++){
            for(let j=i; j<list.length; j++){
                if(totalCharCode(list[i].City) > totalCharCode(list[j].City))
                {
                    const temp = list[i];
                    list[i] = list[j]
                    list[j] = temp;
                }
            }
        }
        for(let i=0; i<list.length; i++){
            sellerList.push([`${list[i].FirmCode}, ${list[i].City}`, list[i].FirmID]);
        }
        console.log(sellerList);
    }

    function totalCharCode(text){
        String.prototype.turkishtoEnglish = function () {
            return this.replace('ğ','g')
                .replace('ü','u')
                .replace('ş','s')
                .replace('ı','i')
                .replace('ö','o')
                .replace('ç','c');
        };

        text = text.toLocaleLowerCase();
        if(text == "istanbul") console.log(text)
        text = text.turkishtoEnglish();
        return text.charCodeAt(0) * 1000 + text.charCodeAt(1) * 10 + text.charCodeAt(2);
    }
}

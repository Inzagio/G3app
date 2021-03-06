			function registerTransaction() { // Creates container element if it has been removed.
			var container = getContainer();
			var calendarType = typeof InstallTrigger !== "undefined" ? "date" : "week"; //sets type of calendar depending on if the browser can read weekNr or not

			menu.setBreadcrumbs('Register Transactions');
			container.innerHTML =
				'<div class="grid wrapper">' +

				'<div class="box nm">' +
				'<div class="box nameBox" id="nameBox"></div>' +
				'</div>' +
				'<div class="box choosedate">'+
				'<div id="paidText">' + '</br></br>Pay social: ' +
				'</div>'+
				'</div>' +

				'<div class="box dato">' +
				'<form>' +
				'Choose week :</br>'+
				'<input id="calendar" type="' + calendarType + '" name="chooseday">' +
				'</form>' +
				
				'<label class="switch"> ' +
				'<input id="socialCheck" type="checkbox">' +
				'<span class="slider round"></span>' +
				'</label>' +
				'</div>' +
				
				'<div class="box meny">' +
				'<div class="dropdown">' +
				'<button class="dropbtn"> Name </button>' +
				'<div id="nameDropdown" class="dropdown-content">' +
				'<input type="text" placeholder="Search name" id="nameInput" onkeyup="filter()">' +
				
				'</div> ' +
				'</div>' +
				'</div>' +
				
				'<div class="box a"> ' +
				'<p> Buy Shares :  </p>' +
				'</div>' +

				'<div class="box b">' +
				'<input id="sharesBought" type="number" placeholder="Buy Shares" min="0" max="100"> <!--Buy shares max 100?-->' +
				'</div>' +

				'<div class="box c"> ' +
				'<p> Loan out of Social Funds: </p>' +
				'</div>'+

				'<div class="box d">' +
				'<input id="socialLoan" type="number" oninput="alertMaxInput(this)" placeholder="Loan From Social Funds" min="0" > <!---max aviable funds(input from DB put 100 as dummy-->' +
				//BtS ALERT//
				'<div id = "socialAlert" class="alert alert-danger hide">' +
				'<strong>Sorry!</strong> Thats all that is aviable for loans at the moment!'+
                '</div>'+
			    //BtS ALERT//
				'</div>' +

				'<div class="box e">' +
				'<p> Pay back loan from Social Funds: </p>' +
				'</div>' +

				'<div class="box f">' +
				'<input id="paySocial" type="number" min="0"  placeholder="Pay Back Loan from SocialFunds"> ' +
				'<br /> ' +
				'</div> ' +
				
				'<div class="box g">' +
				'<p>Loan out of Share Funds:</p>' +
				'</div>' +

				'<div class="box h">' +
				'<input id="sharesLoan" type="number" oninput="alertMaxInput(this)" placeholder="Loan From Share Funds" min="0" > <!---max aviable funds(input from DB put 100 as dummy--> ' +
				//BtS ALERT//
				'<div id = "sharesAlert" class="alert alert-danger hide">' +
				'<strong>Sorry!</strong> Thats all that is aviable for loans at the moment!'+
               '</div>'+
			   //BtS ALERT//
				'</div>' +

				'<div class="box i">' +
				'<p> Pay Back Loan from Shares:</p>' +
				'</div>' +
				'<div class="box j">' +
				'<input id="payShares" type="number" min="0"  placeholder="Pay Back Shares Loan"> ' +
				'</div>' +

				'<div class="box submit"> ' +
				'<input id="submit" type="submit" value="Submit" onclick="submit()"> ' +
				'</div>' +
				'</div>';

				setDateToday(); 
				getUsersRegTrans();
				
			}
			const db = firebase.firestore().collection('registerTransaction');
			var nameDrop = document.getElementById("nameDropdown");
			
			//get usernames from DB
			function getUsersRegTrans() {
			    dbUsers.get().then((show) => { 
				show.forEach((person) => {
				document.getElementById("nameDropdown").innerHTML  += '<a onclick="putName(this)">' + person.data().Username + '</a>';
					})
				})
			}

			//Search/filter namelist dropdown
			function filter() {
				var input = document.getElementById("nameInput");
				var filter = input.value.toUpperCase();
				var a = nameDropdown.getElementsByTagName("a");
				var i;

			for (i = 0; i < a.length; i++) {
				if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
					a[i].style.display = "";
			}
				else {a[i].style.display = "none";}
			}
		}

			function putName(a) {
				nameBox.innerHTML = a.innerHTML;
				nameBox.classList.remove('alertText');
			}

			function alertMaxInput() {
				if (socialLoan.value >= 100) { //100 as dummy. Real number: "toLend * userSavings" <-- userSavings & totalSavings needs to be added to DB
				
				socialLoan.value = 100;   //Sets value to max aviable if more than that is chosen --> ("toLend * userSavings")
				document.getElementById('socialAlert').classList.remove('hide');//shows alert
				}
				if (sharesLoan.value >= 100)
				{sharesLoan.value = 100;   //Sets value to max aviable if more than that is chosen --> ("toLend * userSavings")
				document.getElementById('sharesAlert').classList.remove('hide');//shows alert
				}
			}

			//Calendar with choosable date - todays date set as standard - 
			function setDateToday() {
				if (typeof InstallTrigger !== "undefined") {
				var n = new Date();
				var y = n.getFullYear();
				var m = n.getMonth() + 1;
				var d = n.getDate();
				if (m < 10) m = '0' + m;
				if (d < 10) m = '0' + d;
			document.getElementById("calendar").value = y + "-" + m + "-" + d;
			}
			else {
				setWeek();
			}
		}

			
			//Set calendar to calculate current weeknumber.
			const setWeek = () => {
			   Date.prototype.getWeek = function () {
               var target  = new Date(this.valueOf());
			   var dayNr   = (this.getDay() + 6) % 7;
			   target.setDate(target.getDate() - dayNr + 3);
			   var firstThursday = target.valueOf();
			   target.setMonth(0, 1);
			   if (target.getDay() != 4) {
               target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
            }
			   return 1 + Math.ceil((firstThursday - target) / 604800000);
			}
			   var d= new Date();
	           document.getElementById("calendar").value  = "2018-W"+d.getWeek();
			} 


				
			var valueNotEmpty = '';
			function valueCheck() { //Show a text if name is not chosen
				if (nameBox.innerHTML == '') {
				nameBox.classList.add('alertText');
				nameBox.innerHTML = 'Choose name';
				valueNotEmpty = false;
			};
				        
				if (!socialCheck.checked) { //show a text if social is not checked  
				paidText.classList.add('alertText');
				paidText.innerHTML = 'Remember to pay Social';
				valueNotEmpty = true; //Lets user submit data even if social is not paid - in case of only paying back loan
			}
				else{
				paidText.classList.remove('alertText');
				paidText.classList.add('okText');
				paidText.innerHTML = 'Paid Social';
				valueNotEmpty = true;
				return valueNotEmpty;
			}
		}	

	
			function submit(){  //grab values from inputs
				let Name = nameBox.innerHTML;
				let PaidSocial = socialCheck.checked;
				let SharesBougth   =  sharesBought.value;
				let LoanFromSocial = socialLoan.value;
                let LoanFromShares = sharesLoan.value;
				
				
				addToFirestore(Date, Name, PaidSocial, SharesBougth, LoanFromSocial, LoanFromShares,paySocial,payShares);
                $('input').not("#calendar").not("#submit").val('');
				$(".nameBox").text('');    
            }

			function addToFirestore(Date, Name, PaidSocial, SharesBougth, LoanFromSocial, LoanFromShares, paySocial, payShares){
				let newInput =
					{
					 Date: calendar.value,
					 Name: Name ,
					 PaidSocial: PaidSocial ,
					 SharesBougth: SharesBougth,
					 LoanFromSocial: LoanFromSocial,
					 LoanFromShares: LoanFromShares,
					 PaySocial: paySocial.value,
					 PayShares: payShares.value
					 };	
					  valueCheck();
					if (valueNotEmpty){db.add(newInput)}; 
			}

		   

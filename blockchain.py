import  requests

class blockchain:

  '''land functions to help identify the transactions'''


  def get_land(self):
    resp = requests.get('http://localhost:3000/api/Land')
    for todo_item in resp.json():
        print(todo_item)
  def get_land_by_id(self,id):
    if(not(self.land_present(id))):
      print("no such address found")

    resp = requests.get('http://localhost:3000/api/Land'+id)
    for todo_item in resp.json():
      print(todo_item)

  def post_land(self,address,info,owner_id,isavailable):

    r=requests.post('http://localhost:3000/api/Land', data={
      "$class": "org.example.mynetwork.Land",
      "addressLand": address,
      "information": info,
      "owner": {"resource:org.example.mynetwork.Person#"+owner_id},
      "isAvailable": isavailable
    })
    print(r.status_code)
    if (r.status_code == 200):
        print("Successfull transaction")
    else:
        print("transaction failed")


  def land_present(self,address):
    r = requests.head("http://localhost:3000/api/Land/"+address)
    if(r.status_code==200):
      return True
    else:
      return False

  def delete_land(self,id):
    r=requests.delete("http://localhost:3000/api/Land/"+id)
    if(r.status_code==200):
      print("successfully deleted")
    else:
      print("there was some error")
  def edit_land(self,id):
    r=requests.put("http://localhost:3000/api/Land/"+id,data={
      "$class": "org.example.mynetwork.Land",
      "addressLand": address,
      "information": info,
      "owner": {"resource:org.example.mynetwork.Person#"+owner_id},
      "isAvailable": isavailable
    })
    if(r.status_code==200):
      print("successfully edited")
    else:
      print("there was some error")


  '''Person details of the person responsible for buying and selling of the land'''

  def get_person(self):
    resp = requests.get('http://localhost:3000/api/Person')
    for todo_item in resp.json():
      print(todo_item)

  def get_person_by_id(self,id):
    if (not(self.person_present(id))):
      print("no such person found")

    resp = requests.get('http://localhost:3000/api/Person' + id)
    for todo_item in resp.json():
      print(todo_item)

  def post_person(self,person_id,firstname,lastname):

    requests.post('http://localhost:3000/api/Person', data= {
    "$class": "org.example.mynetwork.Person",
    "personId":person_id ,
    "firstName": firstname,
    "lastName": lastname
  })

  def person_present(self,address):
    r = requests.head("http://localhost:3000/api/Person/"+address)
    if(r.status_code==200):
      return True
    else:
      return False

  def delete_Person(self,id):
    r=requests.delete("http://localhost:3000/api/Person/"+id)
    if(r.status_code==200):
      print("successfully deleted")
    else:
      print("there was some error")
  def edit_person(self,id):
    r=requests.put("http://localhost:3000/api/Person/"+id,data={

      "$class": "org.example.mynetwork.Person",
      "personId": id,
      "firstName": firstname,
      "lastName": lastname

    })
    if(r.status_code==200):
      print("successfully edited")
    else:
      print("there was some error")


  '''USER functions to add remove and edit user which will handle the transactions'''


  def get_user(self):
    resp = requests.get('http://localhost:3000/api/User')
    for todo_item in resp.json():
      print(todo_item)

  def get_user_by_id(self,id):
    if (not(self.user_present(id))):
      print("no such user found")

    resp = requests.get('http://localhost:3000/api/User' + id)
    for todo_item in resp.json():
      print(todo_item)

  def post_user(self,user_id,firstname,lastname,email):

    requests.post('http://localhost:3000/api/User', data= {
          "$class": "org.example.mynetwork.User",
          "userId": user_id,
          "firstName": firstname,
          "lastName": lastname,
          "email": email
        })

  def user_present(self,address):
    r = requests.head("http://localhost:3000/api/User/"+address)
    if(r.status_code==200):
      return True
    else:
      return False

  def delete_user(self,id):
    r=requests.delete("http://localhost:3000/api/User/"+id)
    if(r.status_code==200):
      print("successfully deleted")
    else:
      print("there was some error")
  def edit_user(self,id,firstname,lastname,email):
    r=requests.put("http://localhost:3000/api/User/"+id,data={
          "$class": "org.example.mynetwork.User",
          "userId": id,
          "firstName": firstname,
          "lastName": lastname,
          "email": email
        })
    if(r.status_code==200):
      print("successfully edited")
    else:
      print("there was some error")


  '''Trade functions to define new trade of land between two person'''

  def get_trade(self):
    resp = requests.get('http://localhost:3000/api/Trade')
    for todo_item in resp.json():
           print(todo_item)

  def get_trade_by_id(self, id):
    if (not(self.trade_present(id))):
           print("no such trader to found")

    resp = requests.get('http://localhost:3000/api/Trade' + id)
    for todo_item in resp.json():
        print(todo_item)

  def post_trade(self, address,old_owner_id,new_owner_id,owner_id):

    r=requests.post('http://localhost:3000/api/Trade', data={
      "$class": "org.example.mynetwork.Trade",
      "land":  {"resource:org.example.mynetwork.Land#"+address},
      "newOwner": {"resource:org.example.mynetwork.Person#"+new_owner_id},
      "oldOwner": {"resource:org.example.mynetwork.Person#"+old_owner_id},
      "user": {"resource:org.example.mynetwork.User#"+owner_id},
      "transactionId": address,
      "timestamp": "2018-06-12T09:42:09.435Z"
    })
    print(r.status_code)
    if(r.status_code==200):
        print("Successfull transaction")
    else:
        print("transaction failed")

  def trade_present(self,address):
    r = requests.head("http://localhost:3000/api/Trade/" + address)
    if (r.status_code == 200):
         return True
    else:
         return False


a=blockchain()
# a.post_land(address="u192",info="001",new_owner_id="002",owner_id="001")
#a.post_land(address="u194",info="bfgdf",owner_id="001",isavailable="True")
a.post_trade(address="u194",old_owner_id="001",new_owner_id="002",owner_id="001")

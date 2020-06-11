define([
	"skylark-langx/langx",
	"skylark-utils-dom/query",
	"../inputs",
	"./Input",
	"./tmpl"
],function(langx, $,inputs,Input,tmpl) {

	var ImageInput = Input.inherit({

	    events: [
	        ["blur", "onChange", "input[type=text]"],
	        ["change", "onUpload", "input[type=file]"],
		 ],

		setValue: function(value) {

			//don't set blob value to avoid slowing down the page		
			if (value.indexOf("data:image") == -1)
			{
					$('input[type="text"]', this.element).val(value);
			}
		},

		onUpload: function(event, node) {

			if (this.files && this.files[0]) {
	            var reader = new FileReader();
	            reader.onload = imageIsLoaded;
	            reader.readAsDataURL(this.files[0]);
	            //reader.readAsBinaryString(this.files[0]);
	            file = this.files[0];
	        }

			function imageIsLoaded(e) {
					
					image = e.target.result;
					
					event.data.element.trigger('propertyChange', [image, this]);
					
					//return;//remove this line to enable php upload

					var formData = new FormData();
					formData.append("file", file);
	    
					$.ajax({
						type: "POST",
						url: 'upload.php',//set your server side upload script url
						data: formData,
						processData: false,
						contentType: false,
						success: function (data) {
							console.log("File uploaded at: ", data);
							
							//if image is succesfully uploaded set image url
							event.data.element.trigger('propertyChange', [data, this]);
							
							//update src input
							$('input[type="text"]', event.data.element).val(data);
						},
						error: function (data) {
							alert(data.responseText);
						}
					});		
			}
		},

		init: function(data) {
			return this.render("imageinput", data);
		}	

	});

	return inputs.ImageInput = ImageInput;
});